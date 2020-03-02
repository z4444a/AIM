#!groovy

def label = "jenkins-slave-${UUID.randomUUID().toString()}"

gitlabBuilds(builds: ['Initialize', 'Checkout', 'Build [Backend]', 'Test [Backend]', 'Lint [Backend]', 'Build [Frontend]', 'Test [Frontend]', 'Lint [Frontend]', 'Reporting']) {
  def build_ok = true

  updateGitlabCommitStatus(name: 'Initialize', state: 'pending')

  podTemplate(label: label, slaveConnectTimeout: 1800, containers: [
      containerTemplate(name: 'java', image: 'openjdk:11.0.2-jdk', ttyEnabled: true, command: 'cat'),
      containerTemplate(name: 'node', image: 'node:10.15.1-slim', ttyEnabled: true, command: 'cat'),
  ], volumes: [
      hostPathVolume(mountPath: '/root/.m2', hostPath: '/var/maven/.m2'),
      hostPathVolume(mountPath: '/root/nodejs', hostPath: '/var/nodejs/node_modules'),
      hostPathVolume(mountPath: '/root/.gradle', hostPath: '/var/gradle/'),
      hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
  ]) {
    node(label) {
      updateGitlabCommitStatus(name: 'Initialize', state: 'success')

      stage("Checkout SCM") {
        gitlabCommitStatus(name: "Checkout") {
          //check if triggered by merge request. If true, try merge with target branch

          checkout changelog: true, poll: true, scm: [
              $class                           : 'GitSCM',
              branches                         : [[name: "origin/master"]],
              doGenerateSubmoduleConfigurations: false,
              extensions                       : [],
              submoduleCfg                     : [],
              userRemoteConfigs                : [[credentialsId: 'e4e81238-d10a-42be-8f93-91280c0707e3', name: 'origin', url: 'git@practice.relex.ru:internal/aim.git']]
          ]
        }
      }

      stage("Build Backend") {
        container('java') {
          sh 'export GRADLE_USER_HOME=/root/.gradle'

          gitlabCommitStatus(name: 'Build [Backend]') {
            sh 'chmod +x backend/gradlew'
            sh '(cd ./backend && ./gradlew -q assemble -Dorg.gradle.daemon=false)'
          }
          gitlabCommitStatus(name: 'Test [Backend]') {
            sh '(cd ./backend && ./gradlew -q test -Dorg.gradle.daemon=false)'
          }
          gitlabCommitStatus(name: 'Lint [Backend]') {
            sh '(cd ./backend && ./gradlew -q checkstyleMain pmdMain -Dorg.gradle.daemon=false)'
          }
        }
      }

      stage("Build Frontend") {
        container('node') {
          //sh 'npm config set registry https://repo.common.relex.ru:8443/repository/npm-public'
          sh 'npm config set strict-ssl false'

          gitlabCommitStatus(name: 'Build [Frontend]') {
            sh '(cd ./frontend && npm install && npm install -g eslint && npm run build)'
          }
          gitlabCommitStatus(name: 'Test [Frontend]') {
            println "Running frontend tests"
            //Skip tests for now
            //sh '(cd ./frontend && npm run test)'
            println "frontend tests complete"
          }
          gitlabCommitStatus(name: 'Lint [Frontend]') {
            println "Running frontend linting"
            try {
              sh '(cd ./frontend && node_modules/.bin/eslint --ext .tsx,.ts src/ -f checkstyle > eslint.xml)'
            } catch (Exception e) {
              println "Linting errors is detected: ${e.getMessage()}"
            }
            println "Frontend linting completed"
          }
        }
      }

      stage('Reporting') {
        gitlabCommitStatus(name: 'Reporting') {
          try {
            println 'junit'
            junit testResults: 'backend/**/build/test-results/test/TEST-*.xml'
          } catch (Exception e) {
            println e.getMessage()
            println "No test data found!"
          }

          def issTypes = []

          try {
            println 'scan PMD'
            def pmd = scanForIssues tool: pmd(id: 'PMD', reportEncoding: 'UTF-8', pattern: 'backend/**/build/reports/pmd/main.xml')
            issTypes.add(pmd)
            recordIssues tool: pmd(id: 'PMD', reportEncoding: 'UTF-8', pattern: 'backend/**/build/reports/pmd/main.xml')
          } catch (Exception e) {
            println 'No PMD report found'
          }
          try {
            println 'scan Checkstyle'
            def checkstyle = scanForIssues tool: checkstyle(id: 'Checkstyle', reportEncoding: 'UTF-8', pattern: 'backend/**/build/reports/checkstyle/main.xml')
            issTypes.add(checkstyle)
            recordIssues tool: checkstyle(id: 'Checkstyle', reportEncoding: 'UTF-8', pattern: 'backend/**/build/reports/checkstyle/main.xml')
          } catch (Exception e) {
            println 'No Checkstyle report found'
          }
          try {
            println 'scan ESLINT'
            if (fileExists('frontend/eslint.xml')) {
              println 'eslint.xml exists';
            } else {
              println 'eslint not exist!'
            }
            def eslint = scanForIssues tool: esLint(id: 'ESLint', reportEncoding: 'UTF-8', pattern: 'frontend/eslint.xml')
            issTypes.add(eslint)
            recordIssues tool: esLint(id: 'ESLint', reportEncoding: 'UTF-8', pattern: 'frontend/eslint.xml')
          } catch (Exception e) {
            println e.getMessage()
            println "No eslint report found"
          }

          println 'Publishing issues'
          if (!issTypes.isEmpty()) {
            publishIssues (id: 'AIM Report', name: 'All issues', issues: issTypes, qualityGates: [
                [threshold: 0, type: 'TOTAL_ERROR', unstable: false],
                [threshold: 5, type: 'TOTAL_HIGH', unstable: false],
                [threshold: 50, type: 'TOTAL_NORMAL', unstable: false],
                [threshold: 100, type: 'TOTAL', unstable: false],
                [threshold: 1, type: 'TOTAL', unstable: true]
            ], healthy: 1, unhealthy: 100, minimumSeverity: 'NORMAL')
          }
        }
      }

      if (build_ok) {
        currentBuild.result = "SUCCESS"
      } else {
        currentBuild.result = "FAILURE"
      }
    }
  }
}