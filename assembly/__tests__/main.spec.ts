
import * as contract from '../';
import { VMContext ,Context, context} from "near-sdk-as";


    describe("add complaint tests",()=>{
        it("should run fine with this config", () => {
            expect(() => {
                contract.addNewComplaint("bigcomplaint","mega description",0,"xd");
            }).not.toThrow();
      });
        it("should fail if we give it a empity title", () => {
             expect(() => {
            contract.addNewComplaint("","mega description",0,"xd");
         }).toThrow();
      });

      it("should fail if we give it a empity description", () => {
             expect(() => {
            contract.addNewComplaint("asdsd","",0,"xd");
         }).toThrow();
      });

      it("should fail if we give a long description", () => {
             expect(() => {
            contract.addNewComplaint("asdsd","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",0,"xd");
         }).toThrow();
      });
      
    })
    describe("vote complaint tests",()=>{

        it("should fail if we give a negative index",()=>{
            expect(()=>{contract.voteComplaint(-1)}).toThrow();
        })
        it("should fail if we give a index out of bond",()=>{
            expect(()=>{contract.voteComplaint(200);}).toThrow()
        })
        it("should run fine",()=>{
            contract.addNewComplaint("bigcomplaint","mega description",0,"xd");
            expect(()=>{contract.voteComplaint(0);}).toThrow()
        })
         it("should fail if we the complaint is done",()=>{
            VMContext.setSigner_account_id("first.testnet")
            contract.addNewComplaint("bigcomplaint","mega description",0,"xd");
            VMContext.setSigner_account_id("mega.testnet")
            contract.takeComplaint(0)
            VMContext.setSigner_account_id("first.testnet")
            contract.finishComplaint(0)
            expect(()=>{contract.voteComplaint(0);}).toThrow()
        })
        it("should fail if we already voted",()=>{
            contract.addNewComplaint("bigcomplaint","mega description",0,"xd");
            expect(()=>{contract.voteComplaint(0);}).toThrow()
        })
        it("should fail if we vote a complaint that dont exist",()=>{

            expect(()=>{contract.voteComplaint(0);}).toThrow()
        })
    })
   


