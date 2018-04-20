import express from 'express';
import path from 'path';

const router = express.Router();


router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, process.env.CONFIG_LOCAL_BUILD === "true" ? "/.." : "" , '/../client/build', '/index.html'));
});

export default router;