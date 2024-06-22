import { Service } from "typedi";
import { MediaData } from "../types";
import { AppDataSource } from "../data-source";
import Joi from "joi";
import { Media } from "../entity/Media";

const mediaSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  url: Joi.string().required(),
  userid: Joi.number().required(),
});

// Validate the media data
const validateMedia = (mediaData: MediaData): MediaData => {
  const { error, value } = mediaSchema.validate(mediaData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

@Service()
export class MediaService {
  appDataSource = AppDataSource;

  async createMedia(mediaData: MediaData): Promise<MediaData> {
    try {
      const validatedMediaData = validateMedia(mediaData);

      // Save the media to the database
      const media = await this.appDataSource.manager.save(
        this.appDataSource.manager.create(Media, validatedMediaData)
      );

      return media;
    } catch (error) {
      throw error; // Rethrow other errors
    }
  }
  async viewImage(mediaId: number): Promise<Media | undefined> {
    try {
      // Retrieve the media from the database
      const media = await this.appDataSource.manager.findOne(Media, {
        where: { id: mediaId },
      });

      if (media) {
        // Increment the number of downloads
        media.numberOfDownloads++;
        await this.appDataSource.manager.save(media);
      }

      return media;
    } catch (error) {
      throw error; // Rethrow other errors
    }
  }

  async viewAllMedia(page: number): Promise<Media[]> {
    try {
      const mediaPerPage = 5;
      const skip = (page - 1) * mediaPerPage;

      // Retrieve the media from the database with pagination
      const media = await this.appDataSource.manager.find(Media, {
        skip,
        take: mediaPerPage,
      });

      return media;
    } catch (error) {
      throw error; // Rethrow other errors
    }
  }
}
