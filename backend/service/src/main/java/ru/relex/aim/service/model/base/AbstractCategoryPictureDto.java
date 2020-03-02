package ru.relex.aim.service.model.base;

import java.util.Arrays;

/**
 * Dto class for {@link ru.relex.aim.repository.entity.CategoryPicture}.
 * Holds information shared between update and create DTOs.
 */
public abstract class AbstractCategoryPictureDto {

  private String picturePath;

  private byte[] picture;

  public String getPicturePath() {
    return picturePath;
  }

  public void setPicturePath(String picturePath) {
    this.picturePath = picturePath;
  }

  public byte[] getPicture() {
    if (picture == null) {
      return new byte[0];
    }
    return Arrays.copyOf(picture, picture.length);
  }

  public void setPicture(byte[] picture) {
    this.picture = Arrays.copyOf(picture, picture.length);
  }
}
