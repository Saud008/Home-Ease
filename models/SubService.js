import mongoose from 'mongoose';

const subServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Service
        ref: 'Service',
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const SubService = mongoose.models.SubService || mongoose.model('SubService', subServiceSchema);

export default SubService; 