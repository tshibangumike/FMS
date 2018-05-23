USE [BBU_Dev]

go

SET ansi_nulls ON

go

SET quoted_identifier ON

go

CREATE PROCEDURE [bbu].[Homeaffairsofficer_create] @personId UNIQUEIDENTIFIER,
                                                   @result   INT = -1 output
AS
    BEGIN TRANSACTION;

  BEGIN try
      INSERT INTO [bbu].[DOCTOR]
                  (personid)
      VALUES      (@personId)
  END try

  BEGIN catch
      SELECT Error_number( )    AS ErrorNumber,
             Error_severity( )  AS ErrorSeverity,
             Error_state( )     AS ErrorState,
             Error_procedure( ) AS ErrorProcedure,
             Error_line( )      AS ErrorLine,
             Error_message( )   AS ErrorMessage;

      IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
  END catch;

    IF @@TRANCOUNT > 0 BEGIN
          COMMIT TRANSACTION;

          SET @result = 1;
      END 
