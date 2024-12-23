import { generateUserPassword } from "../../helpers/bcrypt";
import { handleBadRequest } from "../../utils/ErrorHandle";
import ITerror from "../interface/terrorism";
import Iusers from "../interface/usersType";
import terrorismModel from "../models/terrorismModel";
import TrrorModel from "../models/terrorismModel";

const addTrror = async (dataTerror: ITerror) => {
  try {
    const newTrror = new TrrorModel(dataTerror);
    await newTrror.save();
    return newTrror;
  } catch (error) {
    return handleBadRequest("MongoDB", error);
  }
};

const getAllTrrors = async () => {
  try {
    const trrors = await TrrorModel.find();
    return trrors;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getTerrorEventsByBigCasualtiesService = async () => {
  try {
    return await terrorismModel.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching getTerrorEventsByBigCasualtiesService");
  }
};

const trrorsByRegionEndAggregate = async () => {
  try {
    return await TrrorModel.aggregate([
      {
        $group: {
          _id: {
            region: "$region_txt",
            city: "$city",
            lat: "$latitude",
            long: "$longitude",
          },
          total: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { region: "$_id.region", lat: "$_id.lat", long: "$_id.long" },
          total: { $sum: "$total" },
          totalKills: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id.region",
          count: { $avg: ["$total", "$totalKills"] },
          lat: "$_id.lat",
          long: "$_id.long",
        },
      },
      {
        $sort: { count: 1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching trrorsByRegionEndAggregate");
  }
};

const incidentTrends = async (start: number, end: number) => {
  try {
    return await terrorismModel.aggregate([
      {
        $match: {
          iyear: { $gte: start, $lte: end },
        },
      },

      {
        $group: {
          _id: "$attacktype1_txt",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
  } catch (error: any) {
    return handleBadRequest("MongoDB incidentTrends", error);
  }
};

const topGroupsbyRegion = async (region: string) => {
  try {
    return await terrorismModel.aggregate([
      {
        $match: { region_txt: region },
      },
      {
        $group: {
          _id: "$gname",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: 5,
      },
    ]);
  } catch (error: any) {
    return handleBadRequest("MongoDB topGroupsbyRegion", error);
  }
};

const groupsByYear = async (iyear: number) => {
  try {
    return await terrorismModel.aggregate([
      {
        $match: { iyear: iyear },
      },
      {
        $group: {
          _id: "$gname",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
  } catch (error: any) {
    return handleBadRequest("MongoDB groupsByYear", error);
  }
};

const deadliestRegions = async (nameGroup: string) => {
  try {
    return await terrorismModel.aggregate([
      {
        $match: { gname: nameGroup },
      },
      {
        $group: {
          _id: "$region_txt",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
  } catch (error: any) {
    return handleBadRequest("MongoDB deadliestRegions", error);
  }
};

const getTerrorsByCall = async (page: number = 1, limit: number = 200) => {
  try {
    const skip = (page - 1) * limit;
    const terrors = await TrrorModel.find().skip(skip).limit(limit);
    const totalTarrors = await TrrorModel.countDocuments();
    return {
      terrors,
      totalPages: Math.ceil(totalTarrors / limit),
      currentPage: page,
      totalTarrors,
    };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export {
  addTrror,
  getAllTrrors,
  getTerrorsByCall,
  getTerrorEventsByBigCasualtiesService,
  trrorsByRegionEndAggregate,
  incidentTrends,
  topGroupsbyRegion,
  groupsByYear,
  deadliestRegions,
};
