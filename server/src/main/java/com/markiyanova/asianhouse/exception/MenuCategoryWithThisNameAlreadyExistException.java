package com.markiyanova.asianhouse.exception;

public class MenuCategoryWithThisNameAlreadyExistException extends Exception
{
    public MenuCategoryWithThisNameAlreadyExistException(String message)
    {
        super(message);
    }
}
