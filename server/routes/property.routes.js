import express from 'express';
import { createProperty, deleteProperty } from '../controllers/property.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createProperty)
router.delete('/delete/:id', verifyToken, deleteProperty)

export default router