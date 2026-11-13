import { sectionsSchema, textBlocksSchema } from "../content/sections.js";
import {
  DocumentAsset,
  FeeItem,
  MembershipCategory,
  News,
  Page,
  Person,
  Program,
  Settings,
} from "../models/index.js";
import * as data from "./data.js";

/** Loads development seed content into an empty database. */
export async function seedDatabase(): Promise<void> {
  for (const page of data.pages) {
    const result = sectionsSchema.safeParse(page.sections);
    if (!result.success) {
      throw new Error(`Seed page "${page.slug}" has invalid sections: ${result.error.message}`);
    }
    page.sections = result.data as typeof page.sections;
  }
  for (const item of data.news) {
    const result = textBlocksSchema.safeParse(item.body);
    if (!result.success) {
      throw new Error(`Seed article "${item.slug}" has an invalid body: ${result.error.message}`);
    }
  }

  await Settings.create(data.settings);
  await Program.insertMany(data.programs);
  await MembershipCategory.insertMany(data.membershipCategories);
  await Person.insertMany(data.people);
  await FeeItem.insertMany(data.fees);
  await DocumentAsset.insertMany(data.documents);
  await News.insertMany(data.news);
  await Page.insertMany(data.pages);
}

export async function databaseIsEmpty(): Promise<boolean> {
  return (await Settings.countDocuments()) === 0 && (await Page.countDocuments()) === 0;
}
