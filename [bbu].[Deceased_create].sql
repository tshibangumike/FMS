USE [BBU_Dev]

go

/****** Object:  StoredProcedure [tca].[AppUser_create]    Script Date: 5/19/2018 10:48:09 AM ******/
SET ansi_nulls ON

go

SET quoted_identifier ON

go

CREATE PROCEDURE [bbu].[Deceased_create] @personId                 UNIQUEIDENTIFIER,
                                         @funeralId                VARCHAR(150),
                                         @dateOfDeath              VARCHAR(150),
                                         @placeOfDeath             VARCHAR(13) = NULL,
                                         @whereWasTheBodyRetrieved DATE = NULL,
                                         @causeOfDeath             INT = NULL,
                                         @result                   INT = -1 output
AS
    BEGIN TRANSACTION;

  BEGIN try
      INSERT INTO [bbu].[DECEASED]
                  (personid,
                   funeralid,
                   dateofdeath,
                   placeofdeath,
                   wherewasthebodyretrieved,
                   causeofdeath)
      VALUES      (@personId,
                   @funeralId,
                   @dateOfDeath,
                   @placeOfDeath,
                   @whereWasTheBodyRetrieved,
                   @causeOfDeath)
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
