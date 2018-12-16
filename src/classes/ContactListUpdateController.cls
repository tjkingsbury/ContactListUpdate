

public with sharing class ContactListUpdateController {


    @AuraEnabled
    public static List<Contact> getContacts( Id accountId){
        List<Contact> contacts = [SELECT Id, Name, Phone, Email FROM Contact WHERE accountId =:accountId];
        return contacts;
    }


    @AuraEnabled
    public static void updateContacts(List<Id> idList){
        List<Contact> contactList = new List<Contact>();
        for(Id contactId : idList){
            Contact con = new Contact(Id=contactId);
            con.Contacted__c = true;
            contactList.add(con);
        }

        update contactList;
    }
}