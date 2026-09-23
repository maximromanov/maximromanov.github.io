/**
 * Created by rostam on 3/12/17.
 */

function load_data(finished) {
    //var onom, topo,year,geoNW,netwo,rawData,datauni;
    d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataUni",function (error, datauni) {
        d3.json("data/0748Dhahabi.TarikhIslam.JK007088-ara1.descScheme.json", function (error, jsonFile) {
            d3.json("data/places.geojson", function (places) {
                finished(datauni, jsonFile, places);
            });
        });
    });
    // d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataOnom", function (error,data1) {
    //     onom = data1;
    //     d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataTopo", function (error,data2) {
    //         topo = data2;
    //         d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataYear", function (error,data3) {
    //             year = data3;
    //             d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataGeNW", function (error,data4) {
    //                 geoNW=data4;
    //                 d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataNETW", function (error,data5) {
    //                     netwo = data5;
    //                     d3.tsv("data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataRaw", function (error,data6) {
    //                         rawData=data6;
    //                         d3.json("data/0748Dhahabi.TarikhIslam.JK007088-ara1.descScheme.json",function (error, jsonFile) {
    //                             finished(onom, topo, year, geoNW, netwo, rawData, jsonFile);
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
}

// onom=read.csv(paste0(path,"/data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataOnom"),stringsAsFactors=F,header=F,sep='\t')
// colnames(onom) <- c("id", "item", "type", "meta", "drop")
// onom$drop <- NULL
// onom=onom[ with(onom, grepl("#CAT#onom",type)),]
//
// topo=read.csv(paste0(path,"/data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataTopo"),stringsAsFactors=F,header=F,sep='\t')
// colnames(topo) <- c("id", "item", "type", "lat", "lon")
//
// year=read.csv(paste0(path,"/data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataYear"),stringsAsFactors=F,header=F,sep='\t')
// colnames(year) <- c("id", "item", "type")
//
// geoNW=read.csv(paste0(path,"/data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataGeNW"),stringsAsFactors=F,header=F,sep='\t')
// colnames(geoNW) <- c("id", "item1", "type1", "lat1", "lon1", "item2", "type2", "lat2", "lon2")
//
// netwo=read.csv(paste0(path,"/data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataNETW"),stringsAsFactors=F,header=F,sep='\t')
// colnames(netwo) <- c("id", "item1", "type1", "item2", "type2")
//
// rawData=read.csv(paste0(path,"/data/0748Dhahabi.TarikhIslam.JK007088-ara1.dataRaw1"),stringsAsFactors=F,header=F,sep='\t')
// colnames(rawData) <- c("id", "item", "type")
