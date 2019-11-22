# Mongoose Trashcan 🗑

Eat & Keep the 🍰 with the Mongoose Trashcan Plugin

Delete documents as you normally do but have them automagically end up in an archived collection - just in case you need to pull something out of the trash in the future.

## How

### Install

```
npm install mongoose-trashcan
/* or */
yarn add mongoose-trashcan
```

### Create a Mongoose Model for archived items

See the example folder for implementation in JS, Typescript and Typegoose. Copy 🍝
src/example/\*

```javascript
// Example Model Schema using Mongoose and JS
const archivedItemSchema = new Schema({
  originCollection: {
    type: String,
    required: true
  },
  doc: {
    type: Schema.Types.Mixed,
    required: true
  }
});

archivedItemSchema.methods.restore = async function(restoreGlueFn) {
  try {
    await restoreGlueFn(this.originCollection, this.doc);
    await this.remove();
  } catch (error) {
    throw error;
  }
};

const ArchivedItemModel = model("ArchivedItem", archivedItemSchema);
export { ArchivedItemModel };
```

### Plug-in the Plugin

```javascript
// Import the plugin from "mongoose-trashcan" and your own model for the archived item
import { trashcan } from "mongoose-trashcan";
import { ArchivedItemModel } from "../YourModelsDirectory";

/* Your Schema... */
// pass your model for the archived item
yourSchema.plugin(trashcan, { ArchivedItemModel });
```

```typescript
// Using Typegoose?
import { trashcan } from "mongoose-trashcan";

@plugin(traschan, { ArchivedItemModel })
class YourTypegooseClass {
  //...
}
```

### Go Dumpster diving

Restore an archived item by calling the restore method.
This requires your own logic of what to do with the archived document, what model should be recreated etc.

Based on the name of the collection the archived document came from (originCollection) you can discern what model should be used to recreate the document.

In the example we assume the archived document is a user from a collection called users.

```javascript
import { ArchivedItemModel } from '../YourModelsDirectory'

// Find archived item by its id or query based on the type of document you archived.
const archivedItem = await ArchivedItemModel.findById(someId)

// 🕯💀
await archivedItem.restore(async (originCollection, doc) => {
  if (originCollection === "users") {
    await YourUserModel.create(doc)
  } else {
    throw `Expected archived document to be User but it's origin is ${originCollection}`,
  }
})

```
