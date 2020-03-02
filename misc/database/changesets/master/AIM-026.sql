CREATE TABLE aim.mail_settings(
    key     text    PRIMARY KEY,
    value   text    NOT NULL
);

INSERT INTO aim.mail_settings VALUES ('mail.server', 'smtp.relex.ru'), ('mail.port', '465'),
      ('email.header.request', 'Создана новая заявка'), ('email.header.change-status', 'Изменен статус заявки'),
      ('email.header.approve-request', 'Заявка была утверждена'), ('email.header.reject-request', 'Заявка была отклонена'),
      ('email.template.create-request', '<p>Заявка ID-${idRequest} на выделение ресурсов типа ${type} была успешно создана ${date}</p>'),
      ('email.template.change-status', '<p>Статус заявка ID-${idRequest} на выделение ресурсов типа ${type} был изменени на  ${status}</p>' ),
      ('email.template.for-pools-owners-about-request', '<p>Была создана заявка ID-${idRequest} на предоставления ресурсов типа ${type} </p>' ),
      ('email.template.approve-request', '<p>Заявка ID-${idRequest} на предоставления ресурсов типа ${type} была утверждена. <br> Был оставлен комментарий: "${comment}"</p>' ),
      ('email.template.reject-request', '<p>Заявка ID-${idRequest} на предоставления ресурсов типа ${type} была отклонена. <br> Был оставлен комментарий: "${comment}"</p>' );
