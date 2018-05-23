USE [BBU_DEV]

go

/****** Object:  StoredProcedure [bbu].[Person_create]    Script Date: 5/19/2018 11:21:58 AM ******/
SET ansi_nulls ON

go

SET quoted_identifier ON

go

CREATE PROCEDURE [bbu].[Funeral_create] @id                   UNIQUEIDENTIFIER,
                                        @funeralNumber        VARCHAR(10),
                                        @graveNumber          VARCHAR(10),
                                        @deceasedId           UNIQUEIDENTIFIER = NULL,
                                        @informantId          UNIQUEIDENTIFIER = NULL,
                                        @nextOfKinId          UNIQUEIDENTIFIER = NULL,
                                        @doctorId             UNIQUEIDENTIFIER = NULL,
                                        @homeAffairsOfficerId UNIQUEIDENTIFIER = NULL,
                                        @mortuaryId           UNIQUEIDENTIFIER = NULL,
                                        @cemeteryId           UNIQUEIDENTIFIER = NULL,
                                        @result               INT = -1 output
AS
    BEGIN TRANSACTION;

  BEGIN try
      INSERT INTO [bbu].[FUENRAL]
                  (id,
                   funeralnumber,
                   gravenumber,
                   deceasedif,
                   informantid,
                   genderid,
                   nextofkinid,
                   doctorid,
                   homeaffairsofficerid,
                   mortuaryid,
                   cemeteryid)
      VALUES      (@id,
                   @funeralNumber,
                   @graveNumber,
                   @deceasedId,
                   @informantId,
                   @nextOfKinId,
                   @doctorId,
                   @homeAffairsOfficerId,
                   @mortuaryId,
                   @cemeteryId)
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
