import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        required: true
    },
    images: [{
        url: String,
        alt: String
    }],
    features: [{
        title: String,
        description: String,
        icon: String
    }],
    pricing: {
        basePrice: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        displayText: String,
        tiers: [{
            name: String,
            basePrice: Number,
            unit: String,
            description: String,
            features: [String]
        }]
    },
    availability: {
        cities: [String],
        slots: [{
            day: String,
            startTime: String,
            endTime: String
        }]
    },
    metadata: {
        minDuration: Number,
        maxDuration: Number,
        requiresInspection: Boolean,
        tags: [String]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service; 