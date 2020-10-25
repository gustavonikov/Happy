import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..','uploads'),
        filename: (req, file, cb) => {
            const fileName = `${file.originalname}-${Date.now()}`;

            cb(null, fileName);
        },
    })
};
