<?php

?>
    <script>

        var index = <?php echo json_encode($galeryID) ?>;
        cgJsData[index].cgJsCountRuserIp = {};
        cgJsData[index].cgJsRatingUserIp = {};
        cgJsData[index].cgJsCountRuserId = {};
        cgJsData[index].cgJsRatingUserId = {};

    </script>
<?php

if (($options['general']['ShowOnlyUsersVotes'] == 1 or $options['general']['HideUntilVote'] == 1) and $options['general']['CheckLogin'] != 1) {

    $countRuserIp = $wpdb->get_results($wpdb->prepare(
        "
							SELECT *
							FROM $tablenameIP
							WHERE GalleryID = %d and IP = %s and Rating > %d
						",
        $galeryID, $userIP, 0
    ));

    if (!empty($countRuserIp)) {

        foreach ($countRuserIp as $object) {
            ?>

            <script>

                var pid = <?php echo json_encode($object->pid);?>;
                var rating = <?php echo json_encode($object->Rating);?>;

                // wenn es bishierher gekommen ist, dann hat der user bereits das bild bewertet
                // sollte es wieder eine id sein die der user schon mal bewertet hat, ann wir dieser eine 1 hinzugefügt
                // cgJsCountSuserIp[pid] die der user nicht bewertet hat sind undefined
                if (typeof cgJsData[index].cgJsCountRuserIp[pid] != 'undefined') {
                    var countR = parseInt(cgJsData[index].cgJsCountRuserIp[pid])+1;
                    var rating = parseInt(cgJsData[index].cgJsRatingUserIp[pid])+parseInt(rating);

                    cgJsData[index].cgJsCountRuserIp[pid] = countR;
                    cgJsData[index].cgJsRatingUserIp[pid] = rating;

                }
                else {
                    cgJsData[index].cgJsCountRuserIp[pid] = 1;
                    cgJsData[index].cgJsRatingUserIp[pid] = rating;
                }

            </script>

            <?php
        }

    }


} else if (($options['general']['ShowOnlyUsersVotes'] == 1 or $options['general']['HideUntilVote'] == 1) and $options['general']['CheckLogin'] == 1) {


        if (is_user_logged_in()) {

            $countRuserId = $wpdb->get_results($wpdb->prepare(
                "
								SELECT *
								FROM $tablenameIP
								WHERE GalleryID = %d and WpUserId = %s and Rating > %d
							",
                $galeryID, $wpUserId, 0
            ));

            if (!empty($countRuserId)) {

                foreach ($countRuserId as $object) {
                    ?>

                    <script>

                        var pid = <?php echo json_encode($object->pid);?>;
                        var rating = <?php echo json_encode($object->Rating);?>;

                        // wenn es bishierher gekommen ist, dann hat der user bereits das bild bewertet
                        // sollte es wieder eine id sein die der user schon mal bewertet hat, ann wir dieser eine 1 hinzugefügt
                        // cgJsCountSuserIp[pid] die der user nicht bewertet hat sind undefined
                        if (typeof cgJsData[index].cgJsCountRuserId[pid] != 'undefined') {
                            var countR = parseInt(cgJsData[index].cgJsCountRuserId[pid])+1;
                            var rating = parseInt(cgJsData[index].cgJsRatingUserId[pid])+parseInt(rating);

                            cgJsData[index].cgJsCountRuserId[pid] = countR;
                            cgJsData[index].cgJsRatingUserId[pid] = rating;

                        }
                        else {
                            cgJsData[index].cgJsCountRuserId[pid] = 1;
                            cgJsData[index].cgJsRatingUserId[pid] = rating;
                        }

                    </script>

                    <?php
                }

            }

        }

} else {

}


