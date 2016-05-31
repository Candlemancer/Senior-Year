// Jonathan Petersen
// A01236750
// CS 5800 - Database Systems
// NoSQL Assignment


// View 1: Count the randomArrayItems.
function(doc) {
    for (var i in doc.data) {
        var person = doc.data[i];
        emit(person.randomArrayItem, 1);
    }
}

function(key, values, rereduce) {
    return values.length;
}

// View 2: Names of people with max age by gender and isActive.
function(doc) {
    if (doc.data) {
        for (i in doc.data) {
            var person = doc.data[i];
            key = [person.gender, person.isActive];
            value = {age: person.age, name: person.name};
            emit(key, value);
        }
    }
}

function(keys, values, rereduce) {
    var maxAge = -Infinity;
    var list = [];

    for (i in values) {
        if (values[i].age > maxAge) {
            maxAge = values[i].age;
        }
    }

    for (i in values) {
        if (values[i].age == maxAge) {
            list.push(values[i].name);
        }
    }

    return {age: maxAge, names: list};
}

// View 3: A count of the people by tags, that is, count all the people with
//         the given value in the tags array.
function(doc) {
    if (doc.data) {
        for (i in doc.data) {
            var person = doc.data[i];
            for (j in person.tags) {
                key = person.tags[j];
                value = 1;
                emit(key, value);
            }
        }
    }
}

// Reduce function builtin. See
// https://wiki.apache.org/couchdb/Built-In_Reduce_Functions#A_count
// for details / equivalent javascript.
_count;

// View 4: The average age of people by company.
function(doc) {
    if (doc.data) {
        for (i in doc.data) {
            var person = doc.data[i];
            key = person.company;
            value = person.age;
            emit(key, value);
        }
    }
}

function(keys, values, rereduce) {
    var sum = 0;
    for (i in values) {
        sum += values[i];
    }

    // NOTE: This .toPrecision call is here to match my output exactly to
    // the provided output.
    return (sum / values.length).toPrecision(3);
}

// View 5: The JSON of the latitude, longitude, and address of each employee
//         that has a latitude of more than 80.
function(doc) {
    if (doc.data) {
        for (i in doc.data) {
            var person = doc.data[i];
            if (person.latitude > 80.0) {
                key = person.id;
                value = {
                    latitude: person.latitude,
                    longitude: person.longitude,
                    address: person.address
                };
                emit(key, value);
            }
        }
    }
}

// View 6: Names of people and their frineds that start with the letter "J"
//         if they have at least one friend whose name starts with the letter
//         "J".
function(doc) {
    if (doc.data) {
        for (i in doc.data) {
            var person = doc.data[i];

            for (j in person.friends) {
                var friendName = person.friends[j].name;

                if (friendName.charAt(0) == 'J') {
                    key = person.name;
                    value = friendName;
                    emit(key, value);
                }
            }
        }
    }
}
