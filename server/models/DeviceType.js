import mongoose from 'mongoose';

const deviceTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

deviceTypeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const DeviceType = mongoose.model('DeviceType', deviceTypeSchema);

export default DeviceType;

