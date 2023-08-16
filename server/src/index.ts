import { Server } from "socket.io";
import pompeyInfluence from "./static/pompey-influence.json" assert { type: "json" };
import bonuses from "./static/bonuses.json" assert { type: "json" };

const io = new Server({
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    },
});

let establishedState = {
    ["sicilia-numidia"]: pompeyInfluence[12],
    ["asia"]: bonuses[2],
    ["italia"]: bonuses[0],
    ["gallia"]: { side: "pompey", id: "backside" },
    ["aegyptus"]: { side: "caesar", id: "control" },
    ["syria"]: { side: "caesar", id: "control" },
    ["aegyptus-syria"]: { side: "caesar", id: "control" },
    ["hispania_citerior"]: { side: "pompey", id: "control" },
    ["gallia-gallia_cisalpina"]: pompeyInfluence[5],
    ["gallia-sardinia"]: pompeyInfluence[11],
    ["gallia-hispania_citerior"]: { side: "pompey", id: "control" },
    ["hispania_citerior-hispania_ulterior"]: pompeyInfluence[10],
};

io.on("connection", (socket) => {
    console.log("a user connected: " + socket.id);

    socket.on("ready", () => {
        console.log("emiting establish");
        socket.emit("established", establishedState);
    });

    socket.on("token", (data) => {
        establishedState = { ...establishedState, ...data };
        socket.broadcast.emit("established", establishedState);
    });
});

io.listen(3000);
