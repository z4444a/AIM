package ru.relex.aim.service.service.impl;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.relex.aim.commons.TemplateType;
import ru.relex.aim.repository.entity.MailSettings;

import ru.relex.aim.repository.repository.MailSettingsRepository;
import ru.relex.aim.service.model.base.MailModel;
import ru.relex.aim.service.service.INotificationService;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;

import java.util.Date;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.CompletableFuture;

/**
 * Manages {@link ru.relex.aim.repository.entity.MailSettings}.
 *
 * @author Nastya Zinchenko
 */
@Service
public class NotificationServiceImpl implements INotificationService {

  private final MailSettingsRepository settingsRepository;

  private final Configuration configuration;
  private final Properties emailProperties = new Properties();
  private Authenticator authenticator;

  private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

  /**
   * Constructor.
   */
  public NotificationServiceImpl(MailSettingsRepository settingsRepository) {
    this.settingsRepository = settingsRepository;
    configuration = new Configuration(Configuration.VERSION_2_3_28);
    configuration.setDefaultEncoding("UTF-8");
    configuration.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
    configuration.setLogTemplateExceptions(false);
    configuration.setWrapUncheckedExceptions(true);
    configuration.setTagSyntax(Configuration.SQUARE_BRACKET_TAG_SYNTAX);
  }


  /**
   * Initialization of authenticator and properties required for sending letters.
   */
  private void initEmailConfig() {
    final String password = settingsRepository.findById("mail.password")
        .map(MailSettings::getValue)
        .orElse("");
    final String port = settingsRepository.findById("mail.port")
        .map(MailSettings::getValue)
        .orElse("465");
    final String from = settingsRepository.findById("mail.fromEmail")
        .map(MailSettings::getValue)
        .orElse("");
    final String host = settingsRepository.findById("mail.server")
        .map(MailSettings::getValue)
        .orElse("smtp.relex.ru");
    final String protocol = settingsRepository.findById("mail.protocol")
        .map(MailSettings::getValue)
        .orElse("SSL");

    if ("ssl".equalsIgnoreCase(protocol)) {
      emailProperties.put("mail.smtp.ssl.enable", "true");
      emailProperties.put("mail.smtp.socketFactory.port", port);
      emailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
    } else {
      emailProperties.put("mail.smtp.starttls.enable", "true");
    }
    emailProperties.put("mail.smtp.host", host);
    emailProperties.put("mail.smtp.port", port);
    emailProperties.put("mail.smtp.auth", "true");
    emailProperties.put("mail.smtp.ssl.trust", host);
    emailProperties.put("mail.from", from);

    authenticator = new Authenticator() {
      private PasswordAuthentication authentication = new PasswordAuthentication(
          from,
          password
      );

      @Override
      public PasswordAuthentication getPasswordAuthentication() {
        return authentication;
      }
    };
  }

  /**
   * Returns the letter template.
   *
   * @param templateType - type of letter template
   */
  private Template getTemplate(TemplateType templateType) throws IOException {
    return new Template(templateType.getName(),
        new StringReader(settingsRepository.findById(templateType.getName()).get().getValue()), configuration);
  }

  /**
   * Setting the title of the letter depending on the template.
   *
   * @param mail instance of the letter
   * @return header
   */
  private String getHeaderForMail(MailModel mail) {
    return "[AIM] " + settingsRepository.findById(mail.getMailType())
        .map(MailSettings::getValue)
        .orElse("");
  }

  private InternetAddress getInternetAddress(String mail) throws AddressException {
    return new InternetAddress(mail);
  }

  /**
   * Sends the specified text to the specified address.
   */
  private void sendLetter(MailModel mail) {
    initEmailConfig();
    final int maxAttemptCount = Integer.parseInt(
        settingsRepository.findById("mail.attemptNum")
            .map(MailSettings::getValue)
            .orElse("4")
    );
    int attemptNum = 0;
    final Session session = Session.getInstance(emailProperties, authenticator);
    session.setDebug(false);

    final MimeMessage message = new MimeMessage(session);
    final Date date = new Date();
    while (mail.getSend() == null) {
      ++attemptNum;
      try {
        message.addRecipient(
            Message.RecipientType.TO, getInternetAddress(mail.getEmail())
        );
        message.setFrom(getInternetAddress(emailProperties.getProperty("mail.from")));
        message.setSubject(getHeaderForMail(mail), "UTF-8");
        message.setContent(mail.getMessage(), "text/html; charset=UTF-8");
        message.setSentDate(date);
        Transport.send(message);
        mail.setSend(true);
      } catch (MessagingException ex) {
        checkMailAttempts(maxAttemptCount, mail, attemptNum);
      }
    }
  }

  private void checkMailAttempts(int maxAttemptCount, MailModel mail, int attemptNum) {
    if (attemptNum == maxAttemptCount) {
      mail.setSend(false);
      logger.warn("Failed to send an " + mail.getMessage() + " email to the following recipient " + mail.getEmail()
          + ", emailType - " + mail.getMailType());
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void notify(String user, TemplateType templateType,
                     Map<String, Object> parameters) {
    final MailModel model = new MailModel();
    try {
      final Template template = getTemplate(templateType);
      final StringWriter writer = new StringWriter();
      template.process(parameters, writer);
      model.setEmail(String.join("", user, "@relex.ru"));
      model.setMailType(templateType.getHeader());
      model.setMessage(writer.toString());
      CompletableFuture.runAsync(() -> {
        sendLetter(model);
      });
    } catch (IOException | TemplateException e) {
      model.setSend(false);
    }
  }
}
