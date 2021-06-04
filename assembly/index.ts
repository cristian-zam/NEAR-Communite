/**
 *
 * this smart contracts saves complaints that an instituion can take to solve them
 * anyone can make a one
 * the ticket is solved if the sender of the ticker accepts it like done
 * @author small-group-d, cocaman.near , cristian-zambrano.near
 *
 */

import { Context ,PersistentVector,u128,logging,ContractPromiseBatch} from "near-sdk-as";
import { complaints, CitizenComplaint, categories, Statuses,usercomplaints,solversmap } from "./models";




const MAX_DESCRIPTION_LENGTH: i32 = 233
const MAX_COMPLAINTS: u32= 5


/**
 *  CALL FUNCTIONS
 */

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
): void{
  assert(title.length >0,"the title is required")
  assert(description.length>0 && description.length<MAX_DESCRIPTION_LENGTH)
  //this key will be stored on the usercomplaints map
  let key= Context.sender + "u"
  let numberOfComplaints =0
  //check if the user has some complaints already
  if(usercomplaints.contains(key)){
    //if haves let see if he reach the max complaints
    assert(usercomplaints.getSome(key)<= MAX_COMPLAINTS,"you reached the maximum amount of complaint")
    numberOfComplaints= usercomplaints.getSome(key)
  }

  complaints.push(
    new CitizenComplaint(title, description, category, location, Context.sender+complaints.length.toString(),Context.blockTimestamp,complaints.length,Context.attachedDeposit)
  );

  usercomplaints.set(key,numberOfComplaints+1)
}

/**
 * 
 * @param id is the index of the what  citizencomplaint an account want's to vote
 * @returns CitizenComplaint
 */
export function voteComplaint(id: i32):CitizenComplaint{
  assert(id>=0,"we dont have negative complaints")
   let complaint  = complaints[id]
   let key = Context.sender+id.toString()
  assert(!complaint.votes.contains(key)," already voted")
  assert(complaint.status!= Statuses.done,"this complaint is already done broh")
  assert(id< complaints.length,"we dont have that complaint")
  complaint.balance=u128.add(complaint.balance , Context.attachedDeposit)
      complaint.voteCount+=1
      complaint.votes.set(key, true)
      complaints.replace(<i32>id, complaint)
  
  return complaint
}

/**
 * anyone can call it
 * @param id which complaint the user wants to remove its vote
 */
export function removeVote(id: i32):CitizenComplaint{
  assert(id>=0 ,"we dont have negative complaints")
  assert(!complaints.isEmpty,"there are not complaints")
  assert(id<= (complaints.length-1),"we dont have that complaint")
  let complaint  = complaints[id]
  let key = Context.sender+id.toString()
  assert(complaint.ticketOwner != key,"sorry the owner the ticker cant unvote")
  assert(complaint.votes.contains(key),"you haven't voted this complaint")
  assert(complaint.status!= Statuses.done,"this complaint is already done broh")
    complaint.voteCount-=1
    complaint.votes.delete(key)
    complaints.replace(<i32>id, complaint)

    return complaint

}


/**
 * 


export function donate(id:i32):CitizenComplaint{

    let complaint  = complaints[id]

  assert(complaint.status!= Statuses.done,"this complaint is alreadt done")
  assert(id>=0 ,"we dont have negative complaints")
  assert(id<= (complaints.length-1),"we dont have that complaint")
  assert(!complaints.isEmpty,"there are not complaints")
  assert(id<= (complaints.length-1),"we dont have that complaint")
  assert(u128.gt(Context.attachedDeposit,u128.Zero),"sorry you dont send funds broh")
  complaint.balance=u128.add(complaint.balance , Context.attachedDeposit)
  complaints.replace(<i32>id, complaint)
   return complaint

}
 */


/**
 * solvers can take the comaplaint that they wish
 * @param id the complaint that a solver wants to take
 * @returns CitizenComplaint
 */
export function takeComplaint(id:i32): CitizenComplaint{

  assert(id>=0 ,"we dont have negative complaints")
  assert(!complaints.isEmpty,"there are not complaints")
  assert(id< complaints.length,"we dont have that complaint")
  let complaint  = complaints[id]
  let key = Context.sender+id.toString()
  assert(complaint.solver == "","sorry this complaint it's taken")
  assert(complaint.status!= Statuses.done,"this complaint is already done broh")
  assert(complaint.ticketOwner != key,"sorry the owner  cant be the solver")
  key= Context.sender
  complaint.solver=key
  complaint.status= Statuses.inProgess
  complaints.replace(<i32>id, complaint)
   return complaint

}

export function finishComplaint(id:i32): CitizenComplaint{

  let complaint  = complaints[id]
  let key = Context.sender+id.toString()
  assert(key == complaint.ticketOwner,"sorry only the ticket owner can mark the complaint as done")
  assert(complaint.solver.length >0," there is not assigned any solver")
  assert(complaint.status!= Statuses.done,"this complaint is already done broh")
  complaint.status= Statuses.done
  complaints.replace(<i32>id, complaint)
  const complaintSolver = ContractPromiseBatch.create(complaint.solver);
  complaintSolver.transfer(complaint.balance);
  return complaint

}

/**
 *  VIEW FUNCTIONS
 */


/**
 * 
 * @returns will return all the stored complaints
 */
export function getComplaints(): Array<CitizenComplaint> {
  const result = new Array<CitizenComplaint>(complaints.length);
  for (let i = 0; i < complaints.length; i++) {
    result[i] = complaints[i];
  }
  return result;
}

/**
 * gets a specific complaint info
 * @param id the index of the complaint to query
 * @returns  CitizenComplaint
 */
export function getComplaintInfo(id : i32):CitizenComplaint{
  assert(complaints.length >0,"we dont have any complaints")
  assert(id>=0,"we dont have negative complaints")
  assert(id<= (complaints.length-1),"we dont have that complaint")
    return complaints[id]

}

/**
 * 
 * @returns will return the metadata of the complaints
 */
export function getNComplaints(): u64 {
  return complaints.length;
}


/**
 * 
 * @returns the amount of tickets that i've issued
 */
export function getNumberOfComplaints():u32{
  let numberofc=0
  let key= Context.sender + "u"
   if(usercomplaints.contains(key)){
    numberofc= usercomplaints.getSome(key)
  }

  return numberofc
}