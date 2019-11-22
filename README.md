# Mongoose Trashcan 🗑

Eat & Keep the 🍰 with the Mongoose Trashcan Plugin

Delete documents as you normally do but have them automagically end up in an archived collection - just in case you need to pull something out of the trash in the future.

## How

### Hook up the provided model to your db

```javascript
/* Together with the rest of your Models */
import { ArchivedItem } from "mongoose-trashcan";
```

### Plug-in the Plugin

```javascript
import { trashcan } from "mongoose-trashcan";

/* Your Schema... */
yourSchema.plugin(trashcan);
```

```typescript
// Using Typegoose?
import { trashcan } from "mongoose-trashcan";

@plugin(traschan)
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
// Find archived item by its id or query based on the type of document you archived.

const archivedItem = await ArchivedItem.findById(someId)

// 🕯💀
await archivedItem.restore(async (originCollection, doc) => {
  if (originCollection === "users") {
    await YourUserModel.create(doc)
  } else {
    throw `Expected archived document to be User but it's origin is ${originCollection}`,
  }
})

```
