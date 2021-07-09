import { Router } from 'express';

import { fileDownload } from '../middleware/download_file';
import fileUpload from '../middleware/file-upload';
import auth from './auth';
import users from './users';

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: "onelink Api", code: 200 });
});

router.put("/download", fileDownload);

router.post("/upload", fileUpload.single("image"), async (req, res) => {
	res.json({
		code: 200,
		message: "image uploaded successfully",
		data: { imageUrl: req.file.path },
	});
});

router.use("/users", users);
router.use("/auth", auth);

export = router;
