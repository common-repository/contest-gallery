<?php

?>
    <script>

        var index = <?php echo json_encode($galeryID) ?>;
        cgJsData[index].cgJsCountSuserIp = {};
        cgJsData[index].cgJsCountSuserId = {};

    </script>
<?php

    // IP check
    if(($options['general']['ShowOnlyUsersVotes']==1 or $options['general']['HideUntilVote']==1) and $options['general']['CheckLogin']!=1){

            $countSuserIp = $wpdb->get_results( $wpdb->prepare(
                "
							SELECT *
							FROM $tablenameIP
							WHERE GalleryID = %d and IP = %s and RatingS = %d
						",
                $galeryID,$userIP,1
            ) );


            if(count($countSuserIp)){

                foreach($countSuserIp as $object){
                    ?>

                    <script>
                        var pid = <?php echo json_encode($object->pid);?>;

                        // wenn es bishierher gekommen ist, dann hat der user bereits das bild bewertet
                        // sollte es wieder eine id sein die der user schon mal bewertet hat, ann wir dieser eine 1 hinzugefügt
                        // cgJsCountSuserIp[pid] die der user nicht bewertet hat sind undefined
                        if(typeof cgJsData[index].cgJsCountSuserIp[pid] != 'undefined'){
                            var countS = parseInt(cgJsData[index].cgJsCountSuserIp[pid]);
                            countS = countS+1;
                            cgJsData[index].cgJsCountSuserIp[pid] = countS;
                        }
                        else{
                            cgJsData[index].cgJsCountSuserIp[pid] = 1;
                        }

                    </script>

                    <?php
                }

            }


    }
    // registered users check
    else if (($options['general']['ShowOnlyUsersVotes']==1 or $options['general']['HideUntilVote']==1) and $options['general']['CheckLogin']==1){


            if(is_user_logged_in()){

                $countSuserId = $wpdb->get_results( $wpdb->prepare(
                    "
								SELECT *
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and RatingS = %d
							",
                    $galeryID,$wpUserId,1
                ) );

                if(count($countSuserId)){

                    foreach($countSuserId as $object){
                        ?>

                        <script>

                            var pid = <?php echo json_encode($object->pid);?>;
                            // wenn es bishierher gekommen ist, dann hat der user bereits das bild bewertet
                            // sollte es wieder eine id sein die der user schon mal bewertet hat, ann wir dieser eine 1 hinzugefügt
                            // cgJsData[index].cgJsCountSuserIp[pid] die der user nicht bewertet hat sind undefined
                            if(typeof cgJsData[index].cgJsCountSuserId[pid] != 'undefined'){
                                var countS = parseInt(cgJsData[index].cgJsCountSuserId[pid]);
                                countS = countS+1;
                                cgJsData[index].cgJsCountSuserId[pid] = countS;
                            }
                            else{
                                cgJsData[index].cgJsCountSuserId[pid] = 1;
                            }

                        </script>

                        <?php
                    }

                }

            }




    }
    else{

    }
