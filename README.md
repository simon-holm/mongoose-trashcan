# Mongoose Trashcan 🗑

Eat & Keep the 🍰

Delete documents as you normally do but have them automagically end up in an archived collection.

## How

### Hook up the provided model to your db

```javascript
import { ArchivedItem } from "mongoose-trashcan";
/* Together with the rest of your Models */
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

```javascript
// find an archived item by its id or querying based on the type of document you have archived.

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
