package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.Objects;

/**
 * Represents an icon that can be attached to resource type.
 *
 * @author Nastya Zinchenko
 */
@Entity
@Table(name = "category_picture", schema = "aim")
public class CategoryPicture {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "category_picture_id")
  private Integer id;

  @Column(name = "picture")
  private byte[] picture;

  @Column(name = "picture_path")
  private String picturePath;

  //region Getters and Setters
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
   * Sets picture.
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
  //endregion


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof CategoryPicture)) {
      return false;
    }
    final CategoryPicture that = (CategoryPicture) o;
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
