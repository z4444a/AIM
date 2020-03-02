package ru.relex.aim.service.model.get;

import java.util.Arrays;
import java.util.Objects;

/**
 * DTO transfer class for {@link ru.relex.aim.repository.entity.CategoryPicture}
 * Used for fetching information to client.
 *
 * @author Dmitriy Poshevelya
 */
public class CategoryPictureGetDto {
  private Integer id;
  private byte[] picture;
  private String picturePath;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  /**
   * Gets picture.
   */
  public byte[] getPicture() {
    if (picture != null) {
      return Arrays.copyOf(picture, picture.length);
    }
    return new byte[0];
  }

  /**
   * sets picture.
   */
  public void setPicture(byte[] picture) {
    if (picture == null) {
      this.picture = new byte[0];
    } else {
      this.picture = Arrays.copyOf(picture, picture.length);
    }
  }

  public String getPicturePath() {
    return picturePath;
  }

  public void setPicturePath(String picturePath) {
    this.picturePath = picturePath;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof CategoryPictureGetDto)) {
      return false;
    }
    final CategoryPictureGetDto that = (CategoryPictureGetDto) object;
    return Objects.equals(id, that.id)
        && Arrays.equals(picture, that.picture)
        && Objects.equals(picturePath, that.picturePath);
  }

  @Override
  public int hashCode() {
    int result = Objects.hash(id, picturePath);
    result = 31 * result + Arrays.hashCode(picture);
    return result;
  }
}
