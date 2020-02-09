module.exports = (client) => {
    const fs = require('fs');
    require('colors');
    fs.readdir('./assets/modules', (err, files) => {
        mdl = __filename.toUpperCase().split('\\')[__filename.toUpperCase().split('\\').length-1].split('.')[0]
        if(!files || files.length < 1) return console.log(`[${mdl}] `.green + `No modules found.`.gray);
        for(i = 0; i < files.length; i++) {
            try {
                require(`./modules/${files[i]}`)(client);
                console.log(`[${mdl}] `.green + `${files[i]} Loaded`.yellow)
            } catch (err) { 
                try {
                    // require(`./modules/${files[i]}`)
                    console.log(`[${mdl}] `.green + `${files[i]} is not Module to be Loaded`.red);
                } catch (err) {
                    console.log(`[${mdl}] `.green + `Something went wrong in ${files[i]} (${err})`.red);
                };
            };
        }
    });
}