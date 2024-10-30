<?php

echo "<div id='cg_upload_form_container' style='visibility:hidden; text-align:left;color:#000;'>";


    // User ID �berpr�fung ob es die selbe ist
    $check = wp_create_nonce("check");


    echo "<input type='hidden' id='cg_upload_form_e_prevent_default' value=''>";

    //$path = $_SERVER['REQUEST_URI'];

    //	echo get_page_link(NULL,false,NULL);
    echo "<div>";
        echo '<form action="" method="post" id="cg_upload_form" enctype="multipart/form-data" novalidate >';

            echo "<input type='hidden' id='cg_check' value='$check'>";
            echo "<input type='hidden' name='check' value='$check'>";

            echo "<input type='hidden' name='GalleryID' value='$galeryID'>";

            echo "<input type='hidden' name='cg_upload_action' value='true'>";


            $i=0;

            // Beim Eintrag wird gesendet:
            /*
            - Feldart
            - FeldID
            - FeldReihenfolge
            - Content
            */

            //echo "<br>getUploadform:<br>";
            //print_r($getUploadForm );

            foreach($getUploadForm as $value){

            if ($value->Field_Type=='image-f'){

            //@$id = $value->f_input_id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); break;} }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_input_image_upload_id'>$titel *</label>";
                echo "<input type='file' id='cg_input_image_upload_id' $SingleBulkUploadConfiguration />";// Content Feld
                //echo "<input type='submit' value='Upload' />";
                echo "<p class='cg_input_error cg_input_error_image_upload'></p>";// Fehlermeldung erscheint hier
                echo "</div>";


            }

            if (@$value->Field_Type=='text-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }

            if($key=='min-char'){ $minsize = ($value) ? "$value" : "" ;}
            if($key=='max-char'){ $maxsize = ($value) ? "$value" : "" ;}

            if($key=='mandatory'){
            $necessary = ($value=='on') ? '*' : '' ;
            $checkIfNeed = ($value=='on') ? 'on' : '' ;
            }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='hidden' name='form_input[]' value='nf'><input type='hidden' name='form_input[]' value='$id'>";// Formart und FormfeldID hidden
                echo "<input type='hidden' name='form_input[]'  value='$Field_Order'>";// Feldreihenfolge wird mitgegeben
                echo "<input type='text' placeholder='$content' class='cg_input_text_class' id='cg_upload_form_field$id' value='' name='form_input[]'>";// Content Feld, l�nge wird �berpr�ft
                echo "<input type='hidden' class='minsize' value='$minsize'>"; // Pr�fen minimale Anzahl zeichen
                echo "<input type='hidden' class='maxsize' value='$maxsize'>"; // Pr�fen maximale Anzahl zeichen
                echo "<input type='hidden' class='cg_form_required' value='$checkIfNeed'>";// Pr�fen ob Pflichteingabe
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }


            if (@$value->Field_Type=='url-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }

            if($key=='mandatory'){
            $necessary = ($value=='on') ? '*' : '' ;
            $checkIfNeed = ($value=='on') ? 'on' : '' ;
            }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='hidden' name='form_input[]' value='url'><input type='hidden' name='form_input[]' value='$id'>";// Formart und FormfeldID hidden
                echo "<input type='hidden' name='form_input[]'  value='$Field_Order'>";// Feldreihenfolge wird mitgegeben
                echo "<input type='text' placeholder='$content' class='cg_input_url_class' id='cg_upload_form_field$id' value='' name='form_input[]'>";// Content Feld, l�nge wird �berpr�ft
                echo "<input type='hidden' class='cg_form_required' value='$checkIfNeed'>";// Pr�fen ob Pflichteingabe
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }

            if (@$value->Field_Type=='email-f'){

            if(is_user_logged_in()==false){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }
            if($key=='mandatory'){
            $necessary = ($value=='on') ? '*' : '' ;
            $checkIfNeed = ($value=='on') ? 'on' : '' ;
            }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='hidden' name='form_input[]'  value='ef'><input type='hidden' name='form_input[]' value='$id'>";//Formart und FormfeldID hidden
                echo "<input type='hidden' name='form_input[]'  value='$Field_Order'>";// Feldreihenfolge wird mitgegeben
                echo "<input type='text' placeholder='$content' value='' class='cg_input_email_class' id='cg_upload_form_field$id' name='form_input[]'>";// Content Feld, l�nge wird �berpr�ft
                echo "<input type='hidden' class='cg_form_required' value='$checkIfNeed'>";// Pr�fen ob Pflichteingabe
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }

            }

            if (@$value->Field_Type=='comment-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }

            if($key=='min-char'){ $minsize = ($value) ? "$value" : "";}
            if($key=='max-char'){ $maxsize = ($value) ? "$value" : "";}

            if($key=='mandatory'){
            $necessary = ($value=='on') ? '*' : '' ;
            $checkIfNeed = ($value=='on') ? 'on' : '' ;
            }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='hidden' name='form_input[]'  value='kf'><input type='hidden' name='form_input[]' value='$id'>";// Formart und FormfeldID hidden
                echo "<input type='hidden' name='form_input[]'  value='$Field_Order'>";// Feldreihenfolge wird mitgegeben
                echo "<textarea maxlength='$maxsize' class='cg_textarea_class' id='cg_upload_form_field$id' placeholder='$content' name='form_input[]'  rows='10' ></textarea>";// Content Feld, l�nge wird �berpr�ft
                echo "<input type='hidden' class='minsize' value='$minsize'>"; // Pr�fen minimale Anzahl zeichen
                echo "<input type='hidden' class='maxsize' value='$maxsize'>"; // Pr�fen maximale Anzahl zeichen
                echo "<input type='hidden' class='cg_form_required' value='$checkIfNeed'>";// Pr�fen ob Pflichteingabe
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }


            if (@$value->Field_Type=='check-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='checkbox' class='cg_check_agreement_class' id='cg_upload_form_field$id'>&nbsp;$content";
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }

            if (@$value->Field_Type=='select-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }

            if($key=='mandatory'){
            $necessary = ($value=='on') ? '*' : '' ;
            $checkIfNeed = ($value=='on') ? 'on' : '' ;
            }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='hidden' name='form_input[]'  value='se'><input type='hidden' name='form_input[]' value='$id'>";// Formart und FormfeldID hidden
                echo "<input type='hidden' name='form_input[]'  value='$Field_Order'>";// Feldreihenfolge wird mitgegeben

                $textAr = explode("\n", $content);

                echo "<select name='form_input[]' class='cg_input_select_class'>";

                    echo "<option value='0'>$language_pleaseSelect</option>";

                    foreach($textAr as $key => $value){

                    echo "<option value='$value'>$value</option>";

                    }

                    echo "</select>";

                echo "<input type='hidden' class='cg_form_required' value='$checkIfNeed'>";// Pr�fen ob Pflichteingabe
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }


            if (@$value->Field_Type=='selectc-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = html_entity_decode(stripslashes($value)); }

            if($key=='mandatory'){
            $necessary = ($value=='on') ? '*' : '' ;
            $checkIfNeed = ($value=='on') ? 'on' : '' ;
            }
            }

            echo "<div class='cg_form_div'>";
                echo "<label for='cg_upload_form_field$id'>$titel $necessary</label>";
                echo "<input type='hidden' name='form_input[]'  value='sec'><input type='hidden' name='form_input[]' value='$id'>";// Formart und FormfeldID hidden
                echo "<input type='hidden' name='form_input[]'  value='$Field_Order'>";// Feldreihenfolge wird mitgegeben

                $textAr = explode("\n", $content);

                echo "<select name='form_input[]' class='cg_input_select_class'>";

                    echo "<option value=''>$language_pleaseSelect</option>";

/*                    foreach($textAr as $key => $value){

                    echo "<option value='$value'>$value</option>";

                    }*/

                    foreach($categories as $category){

                        echo "<option value='".$category->id."' >".$category->Name."</option>";

                    }


                    echo "</select>";

                echo "<input type='hidden' class='cg_form_required' value='$checkIfNeed'>";// Pr�fen ob Pflichteingabe
                echo "<p class='cg_input_error'></p>";// Fehlermeldung erscheint hier
                echo "</div>";

            }


            if (@$value->Field_Type=='html-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            if($key=='content'){ $content = nl2br(html_entity_decode(stripslashes($value))); }
            }

            echo "<div class='cg_form_div cg_html_field_class'>";
                echo $content;
                echo "</div>";

            }

            if (@$value->Field_Type=='caRo-f'){

            $id = $value->id;
            $Field_Order = $value->Field_Order;
            $Field_Content = $value->Field_Content;
            $Field_Content = unserialize($Field_Content);
            foreach($Field_Content as $key => $value){
            if($key=='titel'){ $titel = html_entity_decode(stripslashes($value)); }
            }

            echo "<div class='cg_form_div' id='cg_captcha_not_a_robot_field'>";
                echo "<label for='cg_$check' >$titel</label>";
                echo "<p class='cg_input_error'></p>";
                echo "</div>";

            }



            }

            //$unix = time()+2;

            //echo '<input type="hidden" name="timestamp" value="'.$unix.'">';


            //echo "<div style='display:inline;width:100%;float:left;text-align:left;'>";
                echo "<div class='cg_form_div' id='cg_form_upload_submit_div'>";
                    echo '<input type="submit" name="cg_form_submit" id="cg_users_upload_submit" value="'.$language_sendUpload.'">';
                    echo "<p class='cg_input_error'></p>";
                    echo "</div>";
                //echo "</div>";
            echo '</form>';
        echo "</div>";
    echo "</div>";// Zum schlie�en des obersten Divs #ausgabe1, ist auf hidden wegen javascript

echo "<br/>";

//echo "<input type='hidden' id='resPic'>";

//update_option( "p_cgal1ery_count_uploads", 100 );