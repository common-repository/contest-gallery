cgJsClass.gallery.vars.alreadyLoadedImages = [];
cgJsClass.gallery.vars.sortingStartValue=100000;
cgJsClass.gallery.vars.maxWidthBlogView= 970;
cgJsClass.gallery.vars.countSon= '';
cgJsClass.gallery.vars.countSoff= '';
cgJsClass.gallery.vars.countRon= null;
cgJsClass.gallery.vars.countRoff= null;
cgJsClass.gallery.vars.cgGalleryInfoWidth= 130;
cgJsClass.gallery.vars.localStorageCheck= true;
cgJsClass.gallery.vars.checkCatSelector= false;
cgJsClass.gallery.vars.currentLook= null;
cgJsClass.gallery.vars.hasToAppend=false;
cgJsClass.gallery.vars.rawData=null;
cgJsClass.gallery.vars.cgCenterDiv=null;
cgJsClass.gallery.vars.openedGalleryImageOrder=null;
cgJsClass.gallery.vars.openedGallery=null;
cgJsClass.gallery.vars.galleryForRecursiveNavigation=null;
cgJsClass.gallery.vars.openedRealId=null;
cgJsClass.gallery.vars.countAllImages=null;
cgJsClass.gallery.vars.originImageData=null;
cgJsClass.gallery.vars.stepsNavigationTop=null;
cgJsClass.gallery.vars.stepsNavigationBottom=null;
cgJsClass.gallery.vars.fullscreen=false;
cgJsClass.gallery.vars.fullwindow=null;
cgJsClass.gallery.vars.switchViewsClicked = false;
cgJsClass.gallery.vars.thereIsImageInfo = false;
cgJsClass.gallery.vars.showImageClicked = false;
cgJsClass.gallery.vars.messageContainerShown = false;
cgJsClass.gallery.vars.windowWidthLastResize = null;
cgJsClass.gallery.vars.isMobile = false;
cgJsClass.gallery.vars.keypressStartInSeconds = 0;
cgJsClass.gallery.vars.openedUploadFormGalleryId = 0;
cgJsClass.gallery.vars.backButtonClicked = false;
cgJsClass.gallery.vars.byStartPageOpenedImageId = 0;
cgJsClass.gallery.vars.isEdge = false;
cgJsClass.gallery.vars.passThrough = false;
cgJsClass.gallery.vars.maxImageWidth = 970;
cgJsClass.gallery.vars.cg_position_hrs = '<span class="cg_position_hr_1"></span><span class="cg_position_hr_2" /></span><span class="cg_position_hr_3" /></span>';
cgJsClass.gallery.vars.ratingAndCommentsProperties = ['Rating','CountC','CountCtoReview','CountR','CountS','addCountS',
    'addCountR1','addCountR2','addCountR3','addCountR4','addCountR5','addCountR6','addCountR7','addCountR8','addCountR9','addCountR10',
    'CountR1','CountR2','CountR3','CountR4','CountR5','CountR6','CountR7','CountR8','CountR9','CountR10','CountSreal',// CountSreal is for correcting of CountS if addCountS was added
    'CountRtotal','RatingTotal','RatingAverage','RatingAverageForSecondarySorting','RatingTotalForSecondarySorting'];// some values from configure rating are also taken because saving data will used for further processing right after rating, see bottom;
cgJsClass.gallery.vars.emojis = [
    'x1F600',
    'x1F603',
    'x1F604',
    'x1F601',
    'x1F606',
    'x1F605',
    'x1F602',
    'x1F923',
    'x1F642',
    'x1F643',
    'x1F60A',
    'x1F607',
    'x1F60D',
    'x1F618',
    'x1F61C',
    'x1F911',
    'x1F917',
    'x1F914',
    'x1F614',
    'x1F922',
    'x1F92F',
    'x1F9D0',
    'x1F973',
    'x1F646',
    'x1F596',
    'x1F44C',
    'x1F90F',
    'x270C',
    'x1F44D',
    'x1F44E',
    'x1F44A',
    'x1F44F',
    'x1F91D',
    'x1F680',
    'x1F6F8',
    'x1F319',
    'x2B50',
    'x26A1',
    'x1F525',
    'x2744',
    'x1F30D',
    'x1F30E',
    'x1F30F',
    'x1F3D4',
    'x1F30B',
    'x1F3D6',
    'x1F3DD',
    'x1F34A', 'x1F344', 'x1F37F', 'x1F363', 'x1F370', 'x1F355',
    'x1F354', 'x1F35F', 'x1F6C0', 'x1F48E', 'x1F5FA', 'x23F0', 'x1F579', 'x1F4DA',
    'x1F431', 'x1F42A', 'x1F439', 'x1F424'];
//cgJsClass.gallery.vars.regexEmoticons = /\p{Extended_Pictographic}/ug;
cgJsClass.gallery.vars.regexJapanese = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
cgJsClass.gallery.vars.regexEmoticons = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;// this regex works better!!!
cgJsClass.gallery.vars.videosMetadataLoaded = {};
cgJsClass.gallery.vars.commentSubmitButtonDisabledCounter = 0;
