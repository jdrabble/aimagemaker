const Image = require("../../models/image");
// const downloadImage = require("../../config/downloadImage");
// const path = require("path");

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const makeImage = async (req, res) => {
  // console.log("make image prompt", req.body.prompt);
  // console.log("User id sent in create token", req.user._id);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: req.body.prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data[0].url;
    const description = response.data[0].revised_prompt;

    // const imageName = `${Date.now()}_${req.user._id}_${
    //   Math.floor(Math.random() * 1000000) + 1
    // }`;
    // const savePath = path.resolve(
    //   __dirname,
    //   `../../src/images/${imageName}.jpg`
    // );

    // downloadImage(image_url, savePath)
    //   .then(() => {
    //     console.log("Image downloaded successfully!", imageName, savePath);
    //   })
    //   .catch((err) => {
    //     console.error("Error downloading the image:", err);
    //   });

    const data = {
      user: req.user._id,
      prompt: req.body.prompt,
      imageLink: image_url,
      imageDescription: description,
      // downloadedImageName: imageName,
      // downloadedImagePath: savePath,
    };

    await Image.create(data); //save to database

    res.status(200).json({
      success: true,
      ai_data: image_url,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be made",
    });
  }
};

const getAllImages = async (req, res) => {
  try {
    const data = await Image.find({ user: req.user._id })
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();

    if (!data) {
      throw new Error("An error occured while fetching images.");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching images." });
  }
};

const getImage = async (req, res) => {
  try {
    const data = await Image.findOne({ _id: req.params.id, user: req.user._id })
      .populate("user")
      .exec();

    if (!data) {
      throw new Error("An error occured while fetching the image.");
    }

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the image." });
  }
};

const deleteImage = async (req, res) => {
  try {
    const data = await Image.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!data) {
      throw new Error("An error occured while deleting the image.");
    }

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while deleting the image." });
  }
};

async function searchImages(req, res) {
  try {
    const data = await Image.find({
      user: req.user._id,
      prompt: { $regex: req.query.prompt, $options: "i" },
    }).sort({
      createdAt: -1,
    });

    if (!data) {
      throw new Error("An error occured while fetching images.");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching images." });
  }
}

async function rateImage(req, res) {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Ensure rating is a number
    const ratingValue = Number(req.body.rating);
    if (isNaN(ratingValue)) {
      return res.status(400).json({ message: "Rating must be a number" });
    }

    const existingRating = image.rating.find(
      (rating) => rating.user.toString() === req.user._id.toString()
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = ratingValue;
    } else {
      // Add a new rating
      const newRating = {
        user: req.user._id,
        rating: ratingValue,
      };
      image.rating.push(newRating);
    }

    await image.save();
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  makeImage,
  getAllImages,
  getImage,
  deleteImage,
  searchImages,
  rateImage,
};
