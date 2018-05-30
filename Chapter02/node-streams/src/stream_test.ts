import { FilterTransform } from "./filter_stream";

//we create object of our custom transformation & pass phone and email as sensitive properties
let filter = new FilterTransform([ 'phone', 'email' ]);

//create a readable stream that reads the transformed objects.
filter.on('readable', function () {
    console.log("Transformation:-",filter.read());
});

//create a writable stream that writes data to get it transformed
filter.write({ name: 'Parth', phone: 'xxxxx-xxxxx',email: 'ghiya.parth@gmail.com', id: 1 });
filter.write({ name: 'Dhruvil', phone: 'xxxxx-xxxxx',email:'dhruvil.thaker@gmail.com', id: 2 });
filter.write({ name: 'Dhaval', phone: 'xxxxx-xxxxx',email: 'dhaval.marthak@gmail.com', id: 3 });
filter.write({ name: 'Shruti', phone: 'xxxxx-xxxxx',email: 'shruti.patel@gmail.com', id: 4 });

filter.end(); 