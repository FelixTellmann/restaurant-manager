import express from 'express';
import path from 'path';
import checkAuth from '../scripts/check-auth';

const router = express.Router();

router.use('*', checkAuth);

/** Add routes above this route to create static routes*/
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/../..", '/..', '/client/build', 'index.html'));
});

export default router;

