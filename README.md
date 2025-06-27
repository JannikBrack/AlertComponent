# AlertComponent

## Installation

You can add this package to your project by using these options:

#### yarn:
```bash
  yarn add @fluffys/alertcomponent
```

#### npm:
```bash
  npm i @fluffys/alertcomponent
```

## Usage

Add the AlertComponent to the component of your choice and set an origin.
```tsx
import {AlertComponent} from "@fluffys/alertcomponent";

function App() {
    
    return (
        <>
            <AlertComponent origin={"Main-Window"}/>
        </>
    )
}
```

To send a message to an AlertComponent, you can import and use the MessengerHelper helper tool.

```tsx
import {MessengerHelper} from "@fluffys/alertcomponent";
//...
const messengerHelper = new MessengerHelper();

messengerHelper.sendMessage({
    message: "Hello World",
    severity: "success",
    duration: 1000,
    destination: "Main-Window"
})
//...
```

## Important to know

This is the base layout of a message:

- __message:__ is containing alert content
- __severity:__ contains the type of alert
- __duration:__ contains number of seconds in milliseconds (is not needed)
- __origin:__ contains string where it should appear __(must match with any AlertComponent origin)__
```tsx
export interface AlertMessage {
    message: string;
    severity: "success" | "warning" | "error" | "info";
    duration?: number | undefined;
    destination: string;
}
```

## Optional Usage

The Message helper is basically just a broadcast channel. As log as you name it "triggerAlert" and respect the message layout, it will work.
```ts
channel = new BroadcastChannel("triggerAlert");

channel.postMessage({
    message: "Hello World",
    severity: "success",
    duration: 1000,
    destination: "Main-Window"
});
```

## License

[MIT](https://choosealicense.com/licenses/mit/)