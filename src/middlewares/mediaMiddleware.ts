import { Request, Response, NextFunction } from "express";
import { MediaService } from "../services/MediaController";
import { Container } from "typedi";
import { MessageChannel } from "worker_threads";

export function createMediaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Extract the media data from the request body
  const { name, description, category, url, userid } = req.body;

  const mediaService = Container.get(MediaService);

  // Create the media object
  const media = {
    name,
    description,
    category,
    url,
    userid,
  };

  // Call the createMedia function from the MediaService
  mediaService
    .createMedia(media)
    .then((createdMedia) => {
      res.status(201).json({
        data: [media],
        message: "Media successfully Uploaded",
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message, data: [], error: true });
    });
}

export function viewMediaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Extract the media ID from the request parameters
  const mediaId = parseInt(req.params.mediaId, 10);

  // Call the viewMediaFromDatabase function from the MediaService
  const mediaService = new MediaService();
  mediaService
    .viewImage(mediaId)
    .then((media) => {
      if (media) {
        res.status(200).json({
          data: [media],
          message: "Media fetched successfully",
          error: false,
        });
      } else {
        res
          .status(404)
          .json({ message: "Media not found", error: false, data: [] });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message, error: true, data: [] });
    });
}

export function viewAllMediaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Extract the page number from the query parameters
  const page = parseInt(req.query.page as string, 10) || 1;

  // Call the viewAllMedia function from the MediaService
  const mediaService = new MediaService();
  mediaService
    .viewAllMedia(page)
    .then((media) => {
      res.json({
        data: media,
        message: "media fetched successfully.",
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: [],
        message: "media not fetched successfully.",
        error: true,
      });

      console.log(error);
    });
}
