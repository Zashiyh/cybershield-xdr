import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";
import Incident from "@/models/Incident";

export async function GET() {
  try {
    await connectDB();

    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10);

    const incidents = await Incident.find().sort({ createdAt: -1 }).limit(10);

    const stats = {
      totalAlerts: await Alert.countDocuments(),
      totalIncidents: await Incident.countDocuments(),
      critical: await Alert.countDocuments({ severity: "HIGH" }),
      resolved: await Incident.countDocuments({ status: "RESOLVED" }),
      alerts,
      incidents,
    };

    return NextResponse.json(stats);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}