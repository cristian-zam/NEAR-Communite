/**
 * 
 * this smart contracts saves tickets that an instituion can take to solve them
 * anyone can make a ticket
 * the ticket is solved if the sender of the ticker accepts it like done
 * @author small-group-d, cocaman.near , cristian-zambrano.near
 *
 */

import {PersistentVector,Context } from "near-sdk-as"
import { Ticket,categories,Loc} from "./models"


let tickets= new PersistentVector<Ticket>("tick")

/**
 * this functions allows us to create new tickets
 * @param title what should be displayed at the card on the front
 * @param category what topic is covering
 * @param location where is the location of the problem 
 * @todo avoid ticket redundacy
 */
export function addNewTicket(title:string,category:categories,location:Loc):void {

  tickets.push(new Ticket("firstT","there is a light that dont work properly",category,location,Context.sender))

}

