import { PersistentMap} from "near-sdk-core"


type AccountId = string
/**
 * all avaivables problems
 * @todo add more categories
 */
export enum categories{
    Lights,
    Street,
    Neighborhood,
    Water_Problems

}

/**
 * status of each of the tickets
 */
export enum Statuses{
    done,
    inProgess,
    submited
}


/**
 * represent the location of the problem
 */
export interface Loc{
    long: string
    lat: string
    alt: string
}

/**
 * represent the problem to be solved
 */
export class Ticket{

    ticketOwner: AccountId
    title : string 
    description: string
    category: categories 
    location:Loc
    status:Statuses
    votes : PersistentMap<AccountId,boolean>
    solver: AccountId 
    voteCount: u64

    /**
     * 
     * @param title how it will displayed
     * @param category what topic the ticket is
     * @param location where is the problem
     * @param ticketOwner who send the ticket
     */
    constructor(title:string,description:string,category:categories,location:Loc,ticketOwner:AccountId){

        this.title= title
        this.description= description
        this.category= category
        this.location=location
        this.ticketOwner= ticketOwner
        this.votes = new PersistentMap<AccountId,boolean>("votes")
        this.votes.set(ticketOwner,true)
        this.voteCount=1
        this.solver= ""
        this.status= Statuses.submited
    }
    /**
     * anyone can add a vote for this ticket
     * @param voter string accountid
     */
    addVote(voter: AccountId): void{
        if(!this.votes.get(voter,false)  && this.status != Statuses.done){
        this.votes.set(voter,true)
        this.voteCount+=1
        }

    }
    /**
     * only who already voted can revert it
     * @param voter string accountid
     */
    removeVote(voter:AccountId):void{
       if (this.votes.get(voter,false) && this.ticketOwner != voter){
           this.votes.set(voter,false)
           this.voteCount-=1
       }
       
    }

    /**
     * @todo restrict who can be solver 
     * @param voter the guy  assigned to solve this ticket
     */
    take (voter: AccountId):void{
        if(this.ticketOwner!= voter && this.status != Statuses.done){
            this.solver= voter
            this.status= Statuses.inProgess
        }
    }

    /**
     * @todo add capabillity in order the solver can  request the finalization of a ticket
     * @param voter in this implementation it can be just the guy who submitted the ticket
     */
    finish(voter:AccountId):void{
        if(this.ticketOwner == voter  && this.status != Statuses.done)
            this.status =Statuses.done

    }
}