# Notes

This project uses "Smart Components vs Presentational" components to separate concerns. The two smart components are `Policies` and `Add-Edit` and child components are presentational.


## Future enhancements and refactorings

* Extend `HttpErrorInterceptor` to post client-side errors to service to log.  
* Break down Add-Edit component into smaller component, currently the component is large and has different responsibilities.  
* Display feedback to the user when add/delete/edit has been successful. 
* Add all missing unit tests, currently only the `Policies` component has unit tests.
* Add missing e2e tests.
* Use RxJS store to store objects and state. This will ensure immutability and makes state management easier. Also, some of the smart components responsibilities e.g get data, can be delegated to effects to make component smaller.    

