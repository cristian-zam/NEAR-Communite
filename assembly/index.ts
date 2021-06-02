/**
 *
 * this smart contracts saves tickets that an instituion can take to solve them
 * anyone can make a ticket
 * the ticket is solved if the sender of the ticker accepts it like done
 * @author small-group-d, cocaman.near , cristian-zambrano.near
 *
 */

import { Context } from "near-sdk-as";
import { complaints, CitizenComplaint, categories } from "./models";

/**
 * this functions allows us to create new tickets
 * @param title what should be displayed at the card on the front
 * @param category what topic is covering
 * @param location where is the location of the problem
 * @todo avoid ticket redundacy
 */
export function addNewComplaint(
  title: string,
  description: string,
  category: categories,
  location: string
): void {
  complaints.push(
    new CitizenComplaint(title, description, category, location, Context.sender)
  );
}

export function getComplaints(): CitizenComplaint[] {
  const numTickets = complaints.length;
  const result = new Array<CitizenComplaint>(numTickets);
  for (let i = 0; i < numTickets; i++) {
    result[i] = complaints[i];
  }
  return result;
}

export function numberOfTickets(): u64 {
  return complaints.length;
}
