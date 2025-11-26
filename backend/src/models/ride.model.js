import mongoose , {Schema} from "mongoose";

const RideSchema = new Schema({
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },

    // Pickup and Drop Location 

    pickup: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    drop: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    dropAddress: {
      type: String,
      required: true,
    },

    // Ride Detail 

    distance: {
      type: Number, // in meters
      required: true,
    },

    duration: {
      type: Number, // in seconds
      required: true,
    },

    routePolyline: {
      type: String, // encoded polyline
    },

    // fair BreakDown 

    fare: {
      baseFare: { type: Number, required: true },
      distanceFare: { type: Number, required: true },
      timeFare: { type: Number, required: true },
      surge: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },

    // Ride Status 

    status: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "arriving",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "requested",
    },

    // Timestamps for Anslytics 

    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    startedAt: { type: Date },
    completedAt: { type: Date },
    cancelledAt: { type: Date },

    cancellationReason: { type: String },  
},
{ 
  timestamps: true 
});

// Geo Indexes (very Important)

RideSchema.index({ pickup: "2dsphere" });
RideSchema.index({ drop: "2dsphere" });

const Ride = mongoose.model("Ride",RideSchema);
export default Ride;