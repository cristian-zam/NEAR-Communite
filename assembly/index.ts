/**
 *
 * this smart contracts saves complaints that an instituion can take to solve them
 * anyone can make a one
 * the ticket is solved if the sender of the ticker accepts it like done
 * @author small-group-d, cocaman.near , cristian-zambrano.near
 *
 */

import { Context ,PersistentVector,u128,logging} from "near-sdk-as";
import { complaints, CitizenComplaint, categories } from "./models";




const MAX_DESCRIPTION_LENGTH: i32 = 233
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
  assert(title.length >0,"the title is required")
  assert(description.length>0 && description.length<MAX_DESCRIPTION_LENGTH)


  complaints.push(
    new CitizenComplaint(title, description, category, location, Context.sender,Context.blockTimestamp,complaints.length)
  );
}

/**
 * 
 * @param id is the index of the what  citizencomplaint an account want's to vote
 * @returns CitizenComplaint
 */
export function voteComplaint(id: i32):CitizenComplaint{
  logging.log(complaints[id].data(Context.sender))
  assert(id>=0,"we dont have negative complaints")
  
  complaints[id].addVote(Context.sender)
  return complaints[id]
}

/**
 * 
 * @param id the index of the complaint to query
 * @returns  CitizenComplaint
 */
export function getComplaintInfo(id : i32):CitizenComplaint{
  assert(complaints.length >0,"we dont have any complaints")
  assert(id>=0,"we dont have negative complaints")
    return complaints[id]

}
export function getComplaints(): PersistentVector<CitizenComplaint> {
  return complaints;
}

export function numberOfTickets(): u64 {
  return complaints.length;
}
