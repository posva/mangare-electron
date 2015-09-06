# mangare

> A Manga app


## Dev

To make things faster while developing I use watchify instead of a gulp task for
the coffee and run everything else (jade and stylus) with gulp. Therefore, while
developing you need both commands to be running:

- `npm run dev` launches watchify
- `gulp watch` launches gulp

### Run

```
$ npm start
```

### Build

```
$ npm run build
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/maxogden/electron-packager).


## License

MIT © [Eduardo San Martin Morote](http://posva.net/mangare)
