<?php
if(!defined('ABSPATH')){exit;}

if (!function_exists('contest_gal1ery_mail_image_activation'))   {
    function contest_gal1ery_mail_image_activation($selectSQLemail,$userMail,$nextId){

        $Subject = contest_gal1ery_convert_for_html_output($selectSQLemail->Header);
        $Admin = $selectSQLemail->Admin;
        $Reply = $selectSQLemail->Reply;
        $cc = $selectSQLemail->CC;
        $bcc = $selectSQLemail->BCC;

        $url = $selectSQLemail->URL;
        $url = (strpos(@$url,'?')) ? $url.'&' : $url.'?';

        $contentMail = contest_gal1ery_convert_for_html_output(@$selectSQLemail->Content);

        $Msg = $contentMail;

        $posUrl = "\$url\$";

        $userMail = sanitize_text_field($userMail);

        if(stripos(@$contentMail,@$posUrl)!==false and @$url==true){

            $codedPictureId = ($nextId+8)*2+100000; // Verschl�sselte ID ermitteln. Gecachte Sites sind mit verschl�sselter ID gespeichert.

            $url1 = @$url."picture_id=$codedPictureId#cg-begin";

            $replacePosUrl = '$url$';

            $Msg = str_ireplace($replacePosUrl, $url1, $contentMail);

        }


        $headers = array();
        $headers[] = "From: $Admin <". strip_tags($Reply) . ">\r\n";
        $headers[] = "Reply-To: ". strip_tags($Reply) . "\r\n";

        if(strpos($cc,';')){
            $cc = explode(';',$cc);
            foreach($cc as $ccValue){
                $ccValue = trim($ccValue);
                $headers[] = "CC: $ccValue\r\n";
            }
        }
        else{
            $headers[] = "CC: $cc\r\n";
        }

        if(strpos($bcc,';')){
            $bcc = explode(';',$bcc);
            foreach($bcc as $bccValue){
                $bccValue = trim($bccValue);
                $headers[] = "BCC: $bccValue\r\n";
            }
        }
        else{
            $headers[] = "BCC: $bcc\r\n";
        }

        $headers[] = "MIME-Version: 1.0\r\n";
        $headers[] = "Content-Type: text/html; charset=utf-8\r\n";

        @wp_mail($userMail, $Subject, $Msg, $headers);

    }
}


?>