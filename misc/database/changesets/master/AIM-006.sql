ALTER TABLE aim.resource_categories
ADD CONSTRAINT fk_category_picture FOREIGN KEY (picture_id) REFERENCES aim.category_picture (category_picture_id);