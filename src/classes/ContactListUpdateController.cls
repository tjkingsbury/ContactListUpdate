/**
 * Created by Turbo_000 on 11/17/2018.
 */

public with sharing class ContactListUpdateController {


    @AuraEnabled
    public static List<Contact> getContacts( Id accountId){
        List<Contact> contacts = [SELECT Id, Name, Phone, Email FROM Contact WHERE accountId =:accountId];
        System.debug('contacts: ' + contacts);
        return contacts;
    }


    @AuraEnabled
    public static void updateContacts(List<Id> idList){
        System.debug('id list: ' + idList);
        List<Contact> contactList = new List<Contact>();
        for(Id contactId : idList){
            Contact con = new Contact(Id=contactId);
            con.Contacted__c = true;
            contactList.add(con);
        }

        update contactList;
    }
}