# Notes

The front end Angular project has been designed to use Angular "smart and presentation" design part.
It has two smart components "Policies" and "Add-Edit". The presentation components communicate with parents through services.


## Future enhancements and refactorings

* Extend HttpErrorInterceptor to post client-side errors to service to log.  
* Break down Add-Edit component into smaller component, currently the component is large and has differenct responsibilities. There are better alternative approache than Angular Reactive Forms that are more extensible. 
* Display feedback to the user when add/delete/edit has been successful. 
* Add all missing unit tests, currently only Policies component have unit test.
* Add missing e2e tests
* Use RxJx store, to store objects and state. This will ensure immutability and state management easier. Also, some of the smart components responsibilities e.g get data, can be delegated to effects to make component smaller.    

