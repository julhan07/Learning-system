<?php

 
    function CreateResponseApi($code, $message, $data = null)
    {
        $res = array(
            'code' => $code,
            'message' => $message
        );

        if ($data) {
            $res['data'] = $data;
        }

        return $res;
    }