/**
 * This file is an attempt to be more fun than 'Untitled'. The user can only make prefix.length * dinosaurs.length * suffix.length files before we run out.
 */

const prefix = ['electric', 'symbolic', 'prehistoric', 'posthistoric', 'shambolic', 'creative', 'alternative', 'original', 'triangular', 'rectangular', 'pentagonal', 'hexagonal', 'rhomboid']
const dinosaurs = ['tyrannosaurus', 'stegosaurus', 'utahraptor', 'dilophosaurus', 'velociraptor', 'velociraptor', 'allosaurus', 'triceratops', 'apatosaurus', 'brachiosaurus', 'ankylosaurus', 'diplodocus', 'iguanodon', 'deinonychus', 'spinosaurus', 'brontosaurus']
const suffix = ['malice', 'propoganda', 'junior', 'mayham', 'chalice', 'maxmiumus', 'minimus', 'hustle', 'commute', 'dictionary', 'university', 'administration', 'society', 'goverment', 'collective', 'collaboration']


// https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
const getRandom = (list) => { return list[Math.floor(Math.random() * list.length)]; }


// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export default () => {
    var title = getRandom(prefix) + " " + getRandom(dinosaurs) + " " + getRandom(suffix);
    return toTitleCase(title)
}