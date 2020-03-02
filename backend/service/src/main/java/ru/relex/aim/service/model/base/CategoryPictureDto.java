package ru.relex.aim.service.model.base;

/**
 * DTO creating class for {@link ru.relex.aim.repository.entity.CategoryPicture}
 * Used for creating new instance from client data.
 *
 * @author Dmitriy Poshevelya
 */
public class CategoryPictureDto {

  private String picturePath;

  public String getPicturePath() {
    return picturePath;
  }

  public void setPicturePath(String picturePath) {
    this.picturePath = picturePath;
  }
}
