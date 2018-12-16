/**
 * Created by Turbo_000 on 11/17/2018.
 */
({
    loadContacts : function(component){
        console.log('in load contacts');
        var action = component.get("c.getContacts");
        console.log('after get contacts');
        action.setParams({
            accountId : component.get("v.recordId")
        });
        console.log('after set params');
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.contacts",response.getReturnValue());
                console.log('component: ' + JSON.stringify(component.get("v.contacts")) );
            }
            else if(state === "ERROR"){
                console.log('error');
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);
                    }
                    else{
                        console.log("Unknown Error");
                    }
                }
            }
        });

        $A.enqueueAction(action);
    }
})